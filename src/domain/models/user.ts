import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"


@Entity("users")
export default class User{
   @PrimaryGeneratedColumn("uuid")
   id: string

   @Column()
   name: string

   @Column()
   email: string

   @Column()
   password: string

   @CreateDateColumn()
   createdAt: Date

   @Column({ nullable: true })
   excludedAt: Date | null


   constructor(name: string, email: string, password: string){
      this.name = name
      this.email = email
      this.password = password
      this.excludedAt = null
   }

}
