import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export interface YearPickerInterface {
  label: string;
  year: dayjs.Dayjs | undefined;
  setYear: React.Dispatch<React.SetStateAction<dayjs.Dayjs | undefined>>;
}

const YearPicker: React.FC<YearPickerInterface> = ({ label, year, setYear}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label={label}
          name={label?.toLowerCase()}
          openTo="year"
          value={year}
          onChange={(newValue) => setYear(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default YearPicker;
