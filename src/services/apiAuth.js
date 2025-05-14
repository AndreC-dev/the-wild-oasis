import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) throw new Error("Login error", { cause: sessionError });
    if (!session.session) return null;

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) throw new Error("Login error", { cause: userError });

    return user?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1 Update password OR Fullname
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    //2 Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: avatarError } = await supabase.storage.from("avatars").upload(fileName, avatar);

    if (avatarError) throw new Error(avatarError.message);

    //3 Update avatar in the user
    const { data: updatedUser, error: userAvatarError } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    });

    if (userAvatarError) throw new Error(userAvatarError.message);
    return updatedUser;
}
