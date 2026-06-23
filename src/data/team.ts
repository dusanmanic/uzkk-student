import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import player5 from "@/assets/player-5.jpg";
import player6 from "@/assets/player-6.jpg";
import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";

export type Player = {
  num: string;
  name: string;
  position: string;
  height: string;
  birthYear: number;
  birthplace: string;
  img: string;
};

export type StaffMember = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

export const players: Player[] = [
  { num: "07", name: "Ана Митић", position: "Плеј", height: "172 cm", birthYear: 2003, birthplace: "Ниш", img: player1 },
  { num: "12", name: "Милица Јовић", position: "Бек", height: "178 cm", birthYear: 2002, birthplace: "Лесковац", img: player2 },
  { num: "24", name: "Сара Илић", position: "Крило", height: "184 cm", birthYear: 2001, birthplace: "Ниш", img: player3 },
  { num: "10", name: "Јелена Петковић", position: "Крилни центар", height: "188 cm", birthYear: 2000, birthplace: "Врање", img: player4 },
  { num: "08", name: "Тијана Стојановић", position: "Плеј", height: "170 cm", birthYear: 2004, birthplace: "Ниш", img: player5 },
  { num: "13", name: "Невена Ђорђевић", position: "Центар", height: "192 cm", birthYear: 1999, birthplace: "Пирот", img: player6 },
];

export const staff: StaffMember[] = [
  {
    name: "Драган Николић",
    role: "Главни тренер",
    bio: "Тренерску каријеру започео је 2005. године. Доноси искуство рада са младим селекцијама и сениорком конкуренцијом.",
    img: coach1,
  },
  {
    name: "Маја Радовановић",
    role: "Помоћни тренер",
    bio: "Бивша репрезентативка Србије. Задужена за индивидуалне тренинге и развој младих играчица.",
    img: coach2,
  },
];

export const youthCoaches: StaffMember[] = [
  {
    name: "Драган Николић",
    role: "Тренер кадетске селекције",
    bio: "Ради са кадетском селекцијом. Фокус на тактичком развоју и припреми за прелазак у сениорски тим.",
    img: coach1,
  },
  {
    name: "Маја Радовановић",
    role: "Тренер пионирске селекције",
    bio: "Води групе од 9 до 13 година. Развој моторике, основних кошаркашких елемената и тимског духа.",
    img: coach2,
  },
];
