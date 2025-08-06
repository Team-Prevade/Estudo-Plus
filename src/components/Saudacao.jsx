export default function Saudação({username}) {
  const hour = new Date().getHours();
  const saudacao =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
    // Depois vamos repassar aqui o nome do usuario dinamicamente

  return (
    <div className={`text-1xl font-semibold text-gray-800`}  >
      {saudacao}, <span className="font-bold"> {username.firstName} {username.lastName}</span>!
    </div>
  );
}