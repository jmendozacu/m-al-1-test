<?php
class Rodanotion_EmailAjax_AddressController extends Mage_Core_Controller_Front_Action
{
    public function checkEmailExistAction()
    {
        $emailAddress = $this->getRequest()->getParam('emailAddress');

        $result = Mage::helper('rodanotion_emailajax')->checkEmailExists($emailAddress);

        $this->getResponse()->setBody($result);
    }
}