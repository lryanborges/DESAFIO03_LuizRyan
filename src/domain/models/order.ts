import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from "typeorm";
import Client from "./client.js";
import Car from "./car.js";

export enum OrderStatus {
  Open = "aberto",
  Approved = "aprovado",
  Canceled = "cancelado",
}

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: "clientId" })
  client: Client;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.Open })
  status: OrderStatus;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  uf: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  concludedAt: Date;

  @Column({ nullable: true })
  excludedAt: Date;

  @OneToOne(() => Car)
  @JoinColumn({ name: "carId" })
  car: Car;
}

export default Order;
