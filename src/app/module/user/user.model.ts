import { Schema, model } from "mongoose";
import { TUser, UserMehods } from "./user.interface";
import { UserRole } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserMehods>(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 4,
      maxlength: 20,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 20,
      required: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    role: { type: String, enum: UserRole, required: true },
  },
  {
    timestamps: true,
  }
);

// password hash
userSchema.pre("save", async function () {
  const user = this;
  const salt = Number(config.bcrypt_salt_round);
  user.password = await bcrypt.hash(user.password, salt);
});

// password empty before send
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

// email chaking
userSchema.pre("save", async function () {
  const user = this as TUser;
  const result = await User.findOne({ email: user?.email });
  if (result) {
    throw new Error("This Email already exists !");
  }
});

// user password match
userSchema.statics.isPasswordMatchMethod = async function (
  plainTextPassword: string,
  hashPassword: string
) {
  const result = await bcrypt.compare(plainTextPassword, hashPassword);
  return result;
};

// JWTIssued Before Password Change Method
userSchema.statics.isJWTIssuedBeforePasswordChangeMethod = (
  passwordChangeTimeStamp: Date,
  jwtIssuedTimeStamp: number
) => {
  const passwordChangeTime = new Date(passwordChangeTimeStamp).getTime() / 1000;
  // console.log({ passwordChangeTime });
  const result = passwordChangeTime > jwtIssuedTimeStamp;
  return result;
};

// user user exists by find _id
userSchema.statics.isUserExistsByDBId = async (id: Schema.Types.ObjectId) => {
  const result = await User.findById(id).select("+password");
  return result;
};

//  user new password hashed
userSchema.statics.newPasswordHashed = async (plainTextPassword: string) => {
  const salt = Number(config.bcrypt_salt_round);
  const result = await bcrypt.hash(plainTextPassword, salt);
  return result;
};

export const User = model<TUser, UserMehods>("User", userSchema);
