"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
  const { handleSubmit, register } = useForm<Form>();
  const [data, setData] = useState<Todos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("todos").select();
      if (error) console.error(error);
      else setData(data);
    };

    fetchData();
  }, []);

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>Todo List</CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="todo" className="mb-2">
              Please write down what to do.
            </Label>
            <div className="flex items-center">
              <Input type="text" id="todo" {...register("todo", { required: true })} />
              <Button type="submit" className="ml-3">
                Submit!
              </Button>
            </div>
          </form>

          {data.map((item) => (
            <p key={item.id}>{item.content}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
