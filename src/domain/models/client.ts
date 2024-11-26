import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("clients")
export default class Client {
   
   @PrimaryGeneratedColumn("uuid")
   id: string

   @Column()
   name: string

   @Column()
   birthDate: Date

   @Column({ unique: true })
   cpf: string

   @Column({ unique: true })
   email: string

   @Column()
   phone: string

   @CreateDateColumn()
   createdAt: Date

   @Column({ nullable: true })
   excludedAt: Date | null = null

   constructor(name: string, birthDate: Date, cpf: string, email: string, phone: string)
   {
      this.name = name
      this.birthDate = birthDate
      this.cpf = cpf
      this.email = email
      this.phone = phone
   }
}
