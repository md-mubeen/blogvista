import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/postSlice";

export default function PostForm({ post }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]; 

        dispatch(
          updatePost({
            slug: post.$id,
            postData: {
              ...data,
              file, 
            },
          })
        );

        navigate("/");
      } else {
        dispatch(
          createPost({
            ...data,
            file: data.image[0], 
            userId: userData.$id,
          })
        );

        navigate("/");
      }
    } catch (error) {
      console.error("Error in submit:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className=" w-full lg:w-1/2 px-2 mx-auto font-semibold text-md">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          readOnly={!!post}
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-6"
          readOnly={!!post}
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

        <Input
          label="Featured Image :"
          type="file"
          className="mb-6"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        <Select
          options={["active", "inactive"]}
          label="Status :"
          className="mb-6"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full text-xl hover:bg-green-800"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
