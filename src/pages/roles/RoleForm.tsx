import { Button, Checkbox, message } from "antd";
import { useFormik } from "formik";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CommonInput from "../../components/CommonInput";
import { createRole, updateRole } from "../../services/api/roles.api";
import { createRoleSchema, updateRoleSchema } from "../../utilities/schema";
import type { PermissionRow, RoleFormProps } from "../../types";
import { AVAILABLE_ACTIONS } from "../../utilities/constant";

function permissionsToRows(
  permissions: Record<string, string[]>,
): PermissionRow[] {
  return Object.entries(permissions).map(([resource, actions]) => ({
    resource,
    actions,
  }));
}

function rowsToPermissions(rows: PermissionRow[]): Record<string, string[]> {
  return rows.reduce(
    (acc, row) => {
      if (row.resource) acc[row.resource] = row.actions;
      return acc;
    },
    {} as Record<string, string[]>,
  );
}

function RoleForm({ role, onSuccess, onClose }: RoleFormProps) {
  const isEdit = !!role;

  const initialPermissions: PermissionRow[] = isEdit
    ? permissionsToRows(role.permissions)
    : [{ resource: "", actions: [] }];

  const handleCreate = async (values: {
    name: string;
    permissions: PermissionRow[];
  }) => {
    try {
      const res = await createRole({
        name: values.name,
        permissions: rowsToPermissions(values.permissions),
      });
      if (res.data.status) {
        message.success("Role created successfully");
        onSuccess();
        onClose();
      } else {
        message.error(res.data.message || "Failed to create role");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to create role");
    }
  };

  const handleUpdate = async (values: {
    name: string;
    permissions: PermissionRow[];
  }) => {
    try {
      const res = await updateRole(role!.id, {
        name: values.name,
        permissions: rowsToPermissions(values.permissions),
      });
      if (res.data.status) {
        message.success("Role updated successfully");
        onSuccess();
        onClose();
      } else {
        message.error(res.data.message || "Failed to update role");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to update role");
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
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: isEdit ? role.name : "",
      permissions: initialPermissions,
    },
    validationSchema: isEdit ? updateRoleSchema : createRoleSchema,
    onSubmit: async (vals) => {
      if (isEdit) {
        await handleUpdate(vals);
      } else {
        await handleCreate(vals);
      }
    },
  });

  const addPermissionRow = () => {
    setFieldValue("permissions", [
      ...values.permissions,
      { resource: "", actions: [] },
    ]);
  };

  const removePermissionRow = (index: number) => {
    const updated = values.permissions.filter((_, i) => i !== index);
    setFieldValue("permissions", updated);
  };

  const handleResourceChange = (index: number, value: string) => {
    const updated = [...values.permissions];
    updated[index] = { ...updated[index], resource: value };
    setFieldValue("permissions", updated);
  };

  const handleActionToggle = (
    index: number,
    action: string,
    checked: boolean,
  ) => {
    const updated = [...values.permissions];
    const current = updated[index].actions;
    updated[index] = {
      ...updated[index],
      actions: checked
        ? [...current, action]
        : current.filter((a) => a !== action),
    };
    setFieldValue("permissions", updated);
  };

  const permErrors = errors.permissions as any;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <CommonInput
        label="Role Name"
        name="name"
        placeholder="Enter role name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name ? errors.name : undefined}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-primary">
            Permissions
          </label>
          <Button
            type="dashed"
            size="small"
            icon={<PlusOutlined />}
            onClick={addPermissionRow}
          >
            Add Resource
          </Button>
        </div>

        {typeof errors.permissions === "string" && touched.permissions && (
          <span className="text-xs text-error">{errors.permissions}</span>
        )}

        <div className="space-y-3">
          {values.permissions.map((row, index) => {
            const rowError = permErrors?.[index];
            return (
              <div
                key={index}
                className="border border-border-subtle rounded-lg p-3 space-y-2"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <CommonInput
                      label=""
                      name={`permissions[${index}].resource`}
                      placeholder="Resource name (e.g. users, roles)"
                      value={row.resource}
                      onChange={(e) =>
                        handleResourceChange(index, e.target.value)
                      }
                      onBlur={handleBlur}
                      error={rowError?.resource ? rowError.resource : undefined}
                    />
                  </div>
                  {values.permissions.length > 1 && (
                    <Button
                      type="text"
                      size="small"
                      icon={<DeleteOutlined />}
                      className="text-text-secondary hover:text-error mt-1"
                      onClick={() => removePermissionRow(index)}
                    />
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {AVAILABLE_ACTIONS.map((action) => (
                    <Checkbox
                      key={action}
                      checked={row.actions.includes(action)}
                      onChange={(e) =>
                        handleActionToggle(index, action, e.target.checked)
                      }
                      className="capitalize"
                    >
                      {action}
                    </Checkbox>
                  ))}
                </div>
                {rowError?.actions && (
                  <span className="text-xs text-error">{rowError.actions}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          className="bg-primary"
        >
          {isEdit ? "Update Role" : "Create Role"}
        </Button>
      </div>
    </form>
  );
}

export default RoleForm;
