// user not updated field
const userNotUpdatedField = ["password", "passwordChangeAt"];
const userObj = payload
for (const field of userNotUpdatedField) {
delete userObj[field] as {[field]?: string}
}

  <!-- // payload: Omit<TUser,  "passwordChangeAt"> -->
