import "./style.css";
import { createClient } from "@supabase/supabase-js";
const env = __APP_ENV__;
const supabase = createClient(env.VITE_URL, env.VITE_KEY);
const formEl = document.getElementById("form");
const appEl = document.getElementById("app");
import moment from "moment";
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(moment("2013-10-01T00:00:00.000").startOf("hour").fromNow());
  addData(e.target.input.value);
});
const CardHtml = (data) => `<div class="bg-white my-3 w-[90%] p-5 rounded-lg">
<p class="font-semibold text-lg">${data.pesan} </p>
<span class="text-gray-500 font-normal text-xs">(${moment(
  data.waktu
).fromNow()})</span>
</div>`;
const addData = async (msg) => {
  const { data, error } = await supabase
    .from("pesan")
    .insert([{ waktu: moment().format(), pesan: msg }]);
  appEl.innerHTML += CardHtml(data[0]);
};
const listCard = async () => {
  const { data, error } = await supabase.from("pesan").select();
  data.forEach((el) => {
    appEl.innerHTML += CardHtml(el);
  });
};
listCard();
