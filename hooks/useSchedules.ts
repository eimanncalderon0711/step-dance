// "use client";
// import { getSchedules } from "@/actions/schedule";
// import { getUsers } from "@/actions/users";
// import { useEffect, useState } from "react";


// export function useSchedules() {
//   const [schedules, setSchedules] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getSchedules()
//       .then(setSchedules)
//       .finally(() => setLoading(false));
//   }, []);
  
//   return { schedules, loading };
// }
