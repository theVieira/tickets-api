export type Permissions = {
  admin: boolean;
  create_ticket: boolean;
  delete_ticket: boolean;
};

export function checkPermission(
  permissions: Permissions,
  requiredPermissions: keyof Permissions
): boolean {
  if (!(requiredPermissions in permissions)) {
    throw new Error("ForbiddenError");
  }
  return permissions[requiredPermissions];
}
