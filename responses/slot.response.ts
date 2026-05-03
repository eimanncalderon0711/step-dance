export type SlotResponse = {
  id: number;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  dayId: number;

  day: {
    id: number;
    date: string;
  };
};