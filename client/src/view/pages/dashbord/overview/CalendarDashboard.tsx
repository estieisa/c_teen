import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Card, CardContent, Badge, CardHeader } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import Tooltip from "@mui/material/Tooltip";
import CelebrationIcon from "@mui/icons-material/Celebration";
import dayjs, { Dayjs } from "dayjs";
import { Post } from "../../../../redux/postsSlice";
import { formatDate, formatTime } from "../../category/PostByCategory";

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs(new Date());

function ServerDay(props: PickersDayProps<Dayjs> & { events: Post[] }) {
  const { events, day, outsideCurrentMonth, ...other } = props;

  const listEvent = useMemo(() => {
    return events.map((event) => ({
      date: formatDate(event.date),
      time: formatTime(event.date),
      title: event?.title,
    }));
  }, [events]);

  const eventsForDay = useMemo(() => {
    return listEvent.filter(
      (event) => event?.date === props.day.format("DD-MM-YYYY")
    );
  }, [listEvent, props.day]);

  const isEventDay = eventsForDay.length > 0;
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTooltipOpen = useCallback(() => {
    setIsTooltipOpen(true);
  }, []);


  return (
    <Tooltip
      title={
        isEventDay ? (
          <div>
            {eventsForDay.map((event, index) => (
              <div key={index}>
                <div>
                  {event.title} בשעה: {event.time}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )
      }
    >
      <div onClick={isEventDay ? handleTooltipOpen : undefined}>
        <Badge
          key={props.day.toString()}
          overlap="circular"
          badgeContent={
            isEventDay ? (
              <CelebrationIcon style={{ color: "#f69e52", fontSize: 20 }} />
            ) : undefined
          }
        >
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
          />
        </Badge>
      </div>
    </Tooltip>
  );
}

export default function CalendarDashboard({ events }: { events: Post[] }) {
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };
  return (
    <Card style={{ textAlign: "center" }}>
      <CardHeader title="לוח שנה" />
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: (dayProps) => (
                <ServerDay {...dayProps} events={events || []} />
              ),
            }}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}
