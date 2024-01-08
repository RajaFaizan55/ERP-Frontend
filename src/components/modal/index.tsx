import style from './modal.module.scss';

interface Props {
  children?: any;
  open?: any;
  className?: any;
  handleClose?: () => void;
  fullScreen?: boolean;
}

const Modal = ({
  open,
  children,
  className,
  handleClose,
  fullScreen = false,
}: Props) => {
  return (
    <>
      {open && (
        <div
          className={style.modalWrapper}
          style={{ padding: fullScreen ? '0' : '20px 20px' }}
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
            handleClose?.();
          }}
        >
          <div
            className={`${style.modalContentWrapper} ${className}`}
            style={{
              ...(fullScreen && {
                maxWidth: '100vw',
                height: '100vh',
                padding: 0,
              }),
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
