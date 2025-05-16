import { useState } from "react";
import { Todos } from "../page";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface Form {
  content: string;
}

export default function Todo({ todo }: { todo: Todos }) {
  const { handleSubmit, register, setValue } = useForm<Form>();
  const [update, setUpdate] = useState(false);

  return (
    <div className="bg-stone-400 text-white p-3 rounded-md flex items-center justify-between">
      {update ? <Input className="max-w-60 border-2" {...register("content")} /> : <p>{todo.content}</p>}

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
          <Button type="button" variant={"ghost"} onClick={() => setUpdate(!update)}>
            수정
          </Button>
        )}
      </div>
    </div>
  );
}
