<?php

class Rodanotion_Custmail_Model_Observer
{
    public function invoicedStatusChange($event)
    {
        $order = $event->getOrder();
        $orderStatus = $order->getStatus();
        if ($order->getState() == Mage_Sales_Model_Order::STATE_CANCELED)
            $this->_sendStatusMail($order);
    }

    private function _sendStatusMail($order)
    {
        $emailTemplate = Mage::getModel('core/email_template');

        $emailTemplate->loadDefault('custom_order_tpl');

        $emailTemplate->setTemplateSubject("Your order was holded");

        $salesData['email'] = Mage::getStoreConfig('trans_email/ident_general/email');
        $salesData['name'] = Mage::getStoreConfig('trans_email/ident_general/name');

        $emailTemplateVariables['username'] = $order->getCustomerFirstname() . ' ' . $order->getCustomerLastname();
        $emailTemplateVariables['orderid'] = $order->getIncrementId();
        $emailTemplateVariables['store_name'] = $order->getStoreName();
        $emailTemplateVariables['store_url'] = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB);

        $emailTemplate->send($order->getCustomerEmail(), $order->getStoreName(), $emailTemplateVariables);

    }
}