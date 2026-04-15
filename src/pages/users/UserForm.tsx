import { Button, Select, message } from "antd";
import { useFormik } from "formik";
import CommonInput from "../../components/CommonInput";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { createUser, updateUser } from "../../services/api/users.api";
import { createUserSchema, updateUserSchema } from "../../utilities/schema";
import type { UserFormProps } from "../../types";
import { STATUS_OPTIONS } from "../../utilities/constant";

function UserForm({ roles, user, onSuccess, onClose }: UserFormProps) {
  const isEdit = !!user;

  const handleCreate = async (values: {
    name: string;
    email: string;
    role_id: string;
  }) => {
    try {
      const res = await createUser(values as any);
      if (res.data.status) {
        message.success("User created successfully");
        onSuccess();
        onClose();
      } else {
        message.error(res.data.message || "Failed to create user");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to create user");
    } finally {
      resetForm();
    }
  };

  const handleUpdate = async (values: {
    name: string;
    role_id: string;
    status: string;
  }) => {
    try {
      const res = await updateUser(user!.id, values as any);
      if (res.data.status) {
        message.success("User updated successfully");
        onSuccess();
        onClose();
      } else {
        message.error(res.data.message || "Failed to update user");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to update user");
    } finally {
      resetForm();
    }
  };

  const {
    handleSubmit,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: isEdit
      ? { name: user.name, role_id: user.role_id, status: user.status }
      : { name: "", email: "", role_id: "" },
    validationSchema: isEdit ? updateUserSchema : createUserSchema,
    onSubmit: async (values) => {
      if (isEdit) {
        await handleUpdate(values as any);
      } else {
        await handleCreate(values as any);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <CommonInput
        label="Full Name"
        name="name"
        placeholder="Enter full name"
        prefix={<UserOutlined className="text-text-secondary mr-2" />}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name ? errors.name : undefined}
      />

      {!isEdit && (
        <CommonInput
          label="Email Address"
          name="email"
          placeholder="Enter email"
          prefix={<MailOutlined className="text-text-secondary mr-2" />}
          value={(values as any).email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            (touched as any).email && (errors as any).email
              ? (errors as any).email
              : undefined
          }
        />
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text-primary">Role</label>
        <Select
          placeholder="Select role"
          value={values.role_id || undefined}
          onChange={(val) => setFieldValue("role_id", val)}
          onBlur={() => setFieldTouched("role_id")}
          options={roles.map((r) => ({ label: r.name, value: r.id }))}
          className="w-full"
          status={touched.role_id && errors.role_id ? "error" : ""}
        />
        {touched.role_id && errors.role_id && (
          <span className="text-xs text-error">{errors.role_id}</span>
        )}
      </div>

      {isEdit && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-primary">
            Status
          </label>
          <Select
            placeholder="Select status"
            value={(values as any).status || undefined}
            onChange={(val) => setFieldValue("status", val)}
            onBlur={() => setFieldTouched("status")}
            options={STATUS_OPTIONS}
            className="w-full"
            status={
              (touched as any).status && (errors as any).status ? "error" : ""
            }
          />
          {(touched as any).status && (errors as any).status && (
            <span className="text-xs text-error">{(errors as any).status}</span>
          )}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          className="bg-primary"
        >
          {isEdit ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
