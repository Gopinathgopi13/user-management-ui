import { Modal } from "antd";
import type { ReactNode } from "react";

interface AppModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode | null;
  width?: number;
}

function AppModal({
  open,
  title,
  onClose,
  children,
  footer = null,
  width = 520,
}: AppModalProps) {
  return (
    <Modal
      open={open}
      title={<span className="text-base font-semibold text-text-primary">{title}</span>}
      onCancel={onClose}
      footer={footer}
      width={width}
      centered
    >
      {children}
    </Modal>
  );
}

export default AppModal;
