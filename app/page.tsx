"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Form {
  todo: string;
}

interface Todos {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export default function Home() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<Form>();

  const onClickLogoutBtn = async () => {
    axios.post("/api/auth/logout").then((res) => {
      if (res.data.success) {
        toast.success("로그아웃되었습니다.");
        router.replace("/login");
      } else toast.error(res.data.message);
    });
  };

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardHeader className="flex items-center justify-between">
          <p>Todo List</p>
          <Button type="button" variant={"destructive"} size={"sm"} onClick={onClickLogoutBtn}>
            로그아웃
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <Input
                type="text"
                id="todo"
                placeholder="오늘의 할 일을 작성해 주세요..!"
                {...register("todo", { required: true })}
              />
              <Button type="submit" className="ml-3">
                추가
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
