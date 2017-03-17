<?php
/**
 * Mailchimp API Integration
 *
 * @category    Ash
 * @package     Ash_Subscribe
 * @copyright   Copyright (c) 2014 August Ash, Inc. (http://www.augustash.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Core data helper
 *
 * @category    Ash
 * @package     Ash_Subscribe
 * @author      August Ash Team <core@augustash.com>
 */
class Ash_Subscribe_Helper_Data extends Mage_Core_Helper_Abstract
{
	public function joinList($post){
        // Pull in our API wrapper.
        require_once('MCAPI.class.php');
        // Pass in our api key and the list(s) to add subscribers.
        $api = new MCAPI('2d245e556dc1f0287a24960b6bfde01e-us4');
        $list_id = "db3b704925";

        // If all of our fields are filled out and solid:
        if($api->listSubscribe($list_id, $post['email']) === true) {
            return 'Success! Check your email to confirm sign up.';
        }else{  
            return 'Error: ' . $api->errorMessage;
        }
	}	
}
