<?php
Class Rodanotion_EmailAjax_Helper_Data extends Mage_Core_Helper_Data
{
    public function checkEmailExists($emailAddress)
    {
        $emailAddressCheck = Mage::getModel('customer/customer')
            ->getCollection()
            ->addAttributeToSelect('email')
            ->addAttributeToFilter('email', $emailAddress)->load();

        if (!$emailAddressCheck->getSize()) {
            $result = 'ok';
        } else {
            $result = 'error';
        }

        return $result;
    }
}