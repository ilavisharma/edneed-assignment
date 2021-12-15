import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  onSubmit?: SubmitHandler<FieldValues>;
  initialValues?: {
    name: string;
    username: string;
    email: string;
  };
  disabled?: boolean;
  addToArray?: any;
  children?: React.ReactNode;
}

const Form = ({
  addToArray,
  initialValues,
  disabled = false,
  children,
}: Props) => {
  const { handleSubmit, register, reset, setFocus } = useForm({
    defaultValues: {
      username: initialValues?.username || "",
      name: initialValues?.name || "",
      email: initialValues?.email || "",
    },
  });

  const onSubmit = (data) => {
    addToArray(data);
    reset();
    setFocus("name");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-around space-x-3"
    >
      <input
        type="text"
        className="p-2 bg-gray-100 roundex-md"
        placeholder="Full Name"
        required={true}
        {...register("name", {
          required: true,
        })}
        disabled={disabled}
      />
      <input
        type="email"
        className="p-2 bg-gray-100 roundex-md"
        placeholder="Email Address"
        required={true}
        {...register("email", {
          required: false,
        })}
        disabled={disabled}
      />
      <input
        type="username"
        className="p-2 bg-gray-100 roundex-md"
        placeholder="Username"
        minLength={4}
        required={true}
        {...register("username", {
          required: true,
        })}
        disabled={disabled}
      />
      {children}
    </form>
  );
};

export default Form;
