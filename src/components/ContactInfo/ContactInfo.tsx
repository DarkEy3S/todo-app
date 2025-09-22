import { Link } from "react-router-dom";
import { GitIcon, HHIcon, TelegramIcon } from "../icons.tsx";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export const ContactInfoSociety = (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => {
  return (
    <ul {...props}>
      <li>
        <Link to={"https://github.com/DarkEy3S"}>
          <GitIcon />
        </Link>
      </li>
      <li>
        <Link to={"https://t.me/Lalla1a"}>
          <TelegramIcon />
        </Link>
      </li>
      <li>
        <Link to={"https://khabarovsk.hh.ru/resume/097a14e8ff0f6e4d560039ed1f6e3279493741"}>
          <HHIcon />
        </Link>
      </li>
    </ul>
  );
};

export const ContactInfoMail = ({ mail, className }: { mail: string; className: string }) => {
  return (
    <Link className={className} to={`mailto:${mail}`}>
      {mail}
    </Link>
  );
};
