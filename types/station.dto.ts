export interface StationDataType {
  boarding_schedule: {
    day_time: {
      day_of_week: {
        S: string;
      };
      time: { S: string };
    };
  };
  passenger_count: number;
  station_latitude: number;
  station_longitude: number;
  station_name: string;
  station_uuid: string;
  stopping_order: number;
  travel_distance: string;
}
