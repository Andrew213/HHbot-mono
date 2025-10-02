import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
   @IsString()
   public firstName!: string;

   @IsString()
   public lastName!: string;

   @IsEmail()
   email!: string;

   @IsNotEmpty()
   password!: string;

   public get fullName() {
      return this.firstName + this.lastName;
   }
}
