"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("유요한 이메일 형식이 아닙니다."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-col items-center">
            <FontAwesomeIcon icon={faUserLock} size="3x" className="text-zinc-800" />
            <p>
              계정이 없으신가요?{" "}
              <Link href={"/signUp"} className="text-blue-500">
                회원가입
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

            <Button className="w-full">로그인</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
