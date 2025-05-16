"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";
import Todo from "./components/todo";

export interface Todos {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

const todoSchema = z.object({
  todo: z.string().min(3, "최소 3자는 입력해주세요..!"),
});

type TodoForm = z.infer<typeof todoSchema>;

export default function Home() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TodoForm>({ defaultValues: { todo: "" }, resolver: zodResolver(todoSchema) });

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error("유저 정보가 존재하지 않습니다.");
          router.replace("/login");
        } else if (err.status === 500) toast.error("서버에 오류가 발생했습니다...ㅠ");
      });
  const { data, isLoading, mutate } = useSWR<Todos[]>("/api/todos/read", fetcher);

  const onClickLogoutBtn = async () => {
    axios.post("/api/auth/logout").then((res) => {
      if (res.data.success) {
        toast.success("로그아웃되었습니다.");
        router.replace("/login");
      } else toast.error(res.data.message);
    });
  };

  const onSubmit = (data: TodoForm) => {
    axios
      .post("/api/todos/create", data)
      .then((res) => {
        toast.success(res.data.message);
        reset();
        mutate();
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error("유저 정보가 존재하지 않습니다.");
          router.replace("/login");
        } else if (err.status === 500) toast.error("서버에 오류가 발생했습니다...ㅠ");
      });
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
            <div className="flex items-end">
              <div className="w-full">
                {errors.todo && <p className="text-sm text-red-500 mb-1">{errors.todo.message}</p>}
                <Input type="text" placeholder="오늘의 할 일을 작성해 주세요..!" {...register("todo", { required: true })} />
              </div>

              <Button type="submit" className="ml-3">
                추가
              </Button>
            </div>
          </form>

          <div className="mt-5">
            {isLoading ? (
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-52"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {data?.map((item) => (
                  <Todo key={item.id} todo={item} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
