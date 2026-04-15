import { KeyOutlined, LockOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import { useFormik } from "formik";
import { changePasswordService } from "../services/api/auth.api";
import { changePasswordSchema } from "../utilities/schema";
import CommonInput from "./CommonInput";

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

function ResetPasswordModal({ open, onClose }: ResetPasswordModalProps) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res: any = await changePasswordService({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        if (res.data?.status) {
          message.success("Password changed successfully");
          onClose();
          resetForm();
        } else {
          message.error(res.data?.message || "Failed to change password");
        }
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message ||
          "Failed to change password. Please try again.";
        message.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleModalClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <KeyOutlined className="text-primary" />
          <span>Reset Password</span>
        </div>
      }
      open={open}
      onCancel={handleModalClose}
      footer={null}
      destroyOnHidden
      centered
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <CommonInput
          label="Current Password"
          name="currentPassword"
          placeholder="Enter your current password"
          isPassword
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.currentPassword && errors.currentPassword
              ? errors.currentPassword
              : undefined
          }
          prefix={<LockOutlined className="text-text-secondary mr-2" />}
        />

        <CommonInput
          label="New Password"
          name="newPassword"
          placeholder="Enter your new password"
          isPassword
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.newPassword && errors.newPassword
              ? errors.newPassword
              : undefined
          }
          prefix={<LockOutlined className="text-text-secondary mr-2" />}
        />

        <CommonInput
          label="Confirm New Password"
          name="confirmPassword"
          placeholder="Confirm your new password"
          isPassword
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : undefined
          }
          prefix={<LockOutlined className="text-text-secondary mr-2" />}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="bg-primary hover:bg-primary/90 border-none"
          >
            Change Password
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ResetPasswordModal;
