<?php

namespace App\Model;

class Customer
{
    private ?int $id = null;
    private ?float $revenue = 0.0;

    public function __construct(array $data)
    {
        $this->fromArray($data);
    }

    public function fromArray(array $data)
    {
       $this->id = (int)$data['id'];
       $this->revenue = (float)$data['revenue'];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRevenue(): ?float
    {
        return $this->revenue;
    }
}