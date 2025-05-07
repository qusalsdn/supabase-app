"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import bcrypt from "bcryptjs";
import axios from "axios";
import toast from "react-hot-toast";

const signUpSchema = z.object({
  email: z.string().email("유효한 이메일 형식이 아닙니다."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
  name: z.string().min(3, "이름은 최소 3자리 이상이어야 합니다."),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = (data: SignUpForm) => {
    data.password = bcrypt.hashSync(data.password, 10);
    axios
      .post("/api/signUp", data)
      .then((res) => (res.data.success ? toast.success("회원가입에 성공하였습니다.") : toast.error(res.data.message)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-col items-center">
            <FontAwesomeIcon icon={faUserPlus} size="3x" />
            <p>
              계정이 있으신가요?{" "}
              <Link href={"/login"} className="text-blue-500">
                로그인
              </Link>
            </p>
          </CardHeader>

          <CardContent className="w-96 space-y-5">
            <div className="space-y-1">
              <Label>이메일</Label>
              <Input type="email" {...register("email", { required: true })} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label>비밀번호</Label>
              <Input type="password" {...register("password", { required: true })} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-1">
              <Label>이름</Label>
              <Input type="text" {...register("name", { required: true })} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
