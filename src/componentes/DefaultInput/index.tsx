import style from "./styles.module.css";

type DefaultInputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<"input">;

export const DefaultInput = ({
  id,
  type,
  labelText,
  ...rest
}: DefaultInputProps) => {
  return (
    <>
      {labelText && <label htmlFor="meuInput">{labelText}</label>}
      <input className={style.input} id={id} type={type} {...rest} />
    </>
  );
};
