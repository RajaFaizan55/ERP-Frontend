import style from './loading.module.scss';

interface Props {
  loaderClass?: string;
}
const Loading = ({ loaderClass }: Props) => {
  return (
    <>
      <div className={`${style.loader} ${loaderClass}`}></div>
    </>
  );
};
export default Loading;
