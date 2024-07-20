<?php

namespace App\Model;

class Order
{
    private ?int $id = null;
    private ?int $customerId = null;
    private ?float $total = null;

    public function __construct(array $data)
    {
        $this->fromArray($data);
    }

    public function fromArray(array $data)
    {
       $this->id = $data['id'];
       $this->customerId = $data['customer-id'];
       $this->total = $data['total'];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomerId(): ?int
    {
        return $this->customerId;
    }

    public function getTotal(): ?float
    {
        return $this->total;
    }
}