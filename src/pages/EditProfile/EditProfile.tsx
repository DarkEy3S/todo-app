import { useEffect, useId, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import btn from "../../assets/buttons.module.css";
import { initials, useAuthReady, useSession } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import cls from "./EditProfile.module.css";

type Gender = "female" | "male" | "custom";

export const EditProfile = () => {
  const session = useSession();
  const ready = useAuthReady();
  const user = session?.user;
  const photoId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const m = user.user_metadata;
    setName(m.full_name ?? "");
    setBirthday(m.birthday ?? "");
    setGender((m.gender as Gender) ?? "");
    setPreview(m.avatar_url ?? "");
    setPhoto(null);
  }, [user]);

  if (!ready) return null;
  if (!session || !user) return <Navigate to="/signin" replace />;

  const avatar = preview || (user.user_metadata.avatar_url as string | undefined);
  const dirty =
    name !== (user.user_metadata.full_name ?? "") ||
    birthday !== (user.user_metadata.birthday ?? "") ||
    gender !== (user.user_metadata.gender ?? "") ||
    Boolean(photo);

  const save = async () => {
    if (!dirty || saving) return;
    setSaving(true);
    let avatar_url = user.user_metadata.avatar_url as string | undefined;
    if (photo) {
      const path = `${user.id}/${photo.name}`;
      const { error } = await supabase.storage.from("avatars").upload(path, photo, { upsert: true });
      if (!error) avatar_url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    }
    await supabase.auth.updateUser({ data: { full_name: name, birthday, gender, avatar_url } });
    setPhoto(null);
    setSaving(false);
  };

  return (
    <section className={cls.page}>
      <form
        className={cls.card}
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <h1 className={cls.title}>Edit profile</h1>
        {avatar ? <img className={cls.avatar} src={avatar} alt="" /> : <div className={cls.avatar}>{initials(user)}</div>}
        <p className={cls.email}>{user.email}</p>

        <label className={cls.field} htmlFor={photoId}>
          <span>Profile photo</span>
          <button className={cls.file} type="button" onClick={() => fileRef.current?.click()}>
            Upload a new profile photo
          </button>
          <input
            ref={fileRef}
            id={photoId}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setPhoto(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        <label className={cls.field}>
          <span>Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </label>

        <label className={cls.field}>
          <span>Birthday</span>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </label>

        <fieldset className={cls.gender}>
          <legend>Gender</legend>
          {(
            [
              ["female", "Female"],
              ["male", "Male"],
              ["custom", "Custom"],
            ] as const
          ).map(([value, label]) => (
            <label key={value}>
              <input type="radio" name="gender" checked={gender === value} onChange={() => setGender(value)} />
              {label}
            </label>
          ))}
        </fieldset>

        <button className={btn.btn} type="submit" disabled={!dirty || saving}>
          Save
        </button>
      </form>
    </section>
  );
};
