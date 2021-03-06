<?php
   class CanvasRedirect_Handle
   {
      protected $default_template='';

      /**
      * handle the page, redirect to right instance or show instances or show default page
      *
      */
      function handle()
      {
         //get i_id from user
         $fb_user_id=get_user_id();

         if($fb_user_id != false)
         {
            $i_id=$this->getInstanceIdFromLog($fb_user_id);
            return $i_id;
         }


         //get i_id from fb_page_url

         $fb_page_url=getServer("HTTP_REFERER");

         if($fb_page_url != false)
         {
            //parse fb page url
            $index=strrpos($fb_page_url,'/');

            $fb_page_url=substr($fb_page_url,0,$index);
            $index=strrpos($fb_page_url,'/');
            $fb_page_url=substr($fb_page_url,$index+1);


            $data=get_fb_app_info($fb_page_url);
            if($data != false)
            {
               $fb_app_id=$data['fb_app_id'];
               $fb_app_secret=$data['fb_app_secret'];

               $facebook=init_facebook($fb_app_id,$fb_app_secret);

               // check necessary permission
               if( $facebook->hasPermission("publish_actions") == false)
               {
                  /*
                  $params=array(
                     'redirect_uri'=> getGlobal('fb_page_url').'index.php',
                  );
                  */

                  if($facebook->isUserDenied() == true)
                  {
                     return false;
                  }

                  $params=array();
                  $facebook->login("js_top","publish_actions",$params);
               }

               $i_id=$this->getInstanceIdFromAction();

               if($i_id > 0)
               {
                  return $i_id;
               }

               //get i_id from user
               $fb_user_id=$facebook->getUserId();

               if($fb_user_id != false)
               {
                  $i_id=$this->getInstanceIdFromLog($fb_user_id);
                  return $i_id;
               }
               else
               {
                  //get friend's uid
                  $friends=$facebook->getFriends($fb_user_id);
                  if($friends != false)
                  {
                     //$i_ids=$this->getFriendsInstance($friend_ids);
                     //render template
                     $this->setDefaultTemplate($friends);
                     return false;
                  }
               }

               //

            }
         }

         return false;

      }
      /**
      * get instance id from app log user
      * this check the most used instance of the fb user
      * then return the instance id
      */
      function getInstanceIdFromLog($fb_user_id)
      {
         $model=getModule("app_log")->getModel("User");

         $i_id=$model->ask('app_log',"getInstanceIdFromLog",array('fb_user_id'=>$fb_user_id));

         return $i_id;
      }

      /**
      * get instance id from facebook action
      */
      function getInstanceIdFromAction()
      {
         $action_id=getRequest("fb_action_ids");

         if($action_id == false)
         {
            return false;
         }

         $facebook=getGlobal("facebook");
         $action=$facebook->getAction($action_id);

         if($action == false)
         {
            return false;
         }

         $i_id=getValue($action['data'],'i_id');

         if($i_id == false)
         {
            return false;
         }

         return $i_id;
      }

      function setDefaultTemplate($friends)
      {
         $block=new Block_FriendsInstance();
         $block->assign("friends",$friends);

         $this->default_template=$block->render();
      }

      function getDefaultTemplate()
      {
         return $this->default_template;
      }

   }
