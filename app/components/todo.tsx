import { useState } from "react";
import { Todos } from "../page";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { KeyedMutator } from "swr";

interface Form {
  content: string;
}

export default function Todo({ todo, mutate }: { todo: Todos; mutate: KeyedMutator<Todos[]> }) {
  const router = useRouter();
  const { register, getValues, setValue } = useForm<Form>();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickUpdateBtn = () => {
    const content = getValues("content");

    if (content.length < 3) return toast.error("최소 3자는 입력해주세요..!");

    if (content !== todo.content) {
      setLoading(true);

      axios
        .post("/api/todos/update", { id: todo.id, content })
        .then((res) => {
          toast.success(res.data.message);
          mutate();
        })
        .catch((err) => {
          if (err.status === 401) {
            toast.error("유저 정보가 존재하지 않습니다.");
            router.replace("/login");
          } else if (err.status === 500) toast.error("서버에 오류가 발생했습니다...ㅠ");
        })
        .finally(() => setLoading(false));
    }

    setUpdate(!update);
  };

  const onClickDeleteBtn = (id: number) => {
    setLoading(true);

    axios
      .post("/api/todos/delete", { id })
      .then((res) => {
        toast.success(res.data.message);
        mutate();
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error("유저 정보가 존재하지 않습니다.");
          router.replace("/login");
        } else if (err.status === 500) toast.error("서버에 오류가 발생했습니다...ㅠ");
      })
      .finally(() => setLoading(false));
  };

  return !loading ? (
    <div className="border px-5 py-3 rounded-full shadow-md">
      <div className="flex items-center justify-between">
        {update ? <Input className="max-w-60 rounded-full text-sm" {...register("content")} /> : <p>{todo.content}</p>}

        <div>
          {!update ? (
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => {
                setUpdate(!update);
                setValue("content", todo.content);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          ) : (
            <Button type="submit" variant={"ghost"} onClick={onClickUpdateBtn}>
              수정
            </Button>
          )}

          <Button type="button" variant={"ghost"} onClick={() => onClickDeleteBtn(todo.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-14 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5 animate-pulse"></div>
  );
}
