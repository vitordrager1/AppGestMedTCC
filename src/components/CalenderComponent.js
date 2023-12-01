import React, { useState } from "react";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import Calendar from "react-calendar"; // Importe o componente react-calendar
import "react-calendar/dist/Calendar.css"; // Importe os estilos do react-calendar
import { format } from "date-fns-tz";

function Calendar2({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" mt="4">
        <Box >
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        </Box>
        <Box boxShadow={5} borderRadius={5} p={2} bg={"#f7f6f0"} mt="4" fontWeight='semibold'>
          Data selecionada: {format(selectedDate, "dd-MM-yyyy")}
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default Calendar2;
