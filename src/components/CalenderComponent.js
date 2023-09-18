import React, { useState } from 'react';
import { ChakraProvider, Container, Box } from '@chakra-ui/react';
import Calendar from 'react-calendar'; // Importe o componente react-calendar
import 'react-calendar/dist/Calendar.css'; // Importe os estilos do react-calendar

function Calendar2() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" mt="4">
        <Box p="4" boxShadow="md" borderRadius="md">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        </Box>
        <Box mt="4">Data selecionada: {selectedDate.toDateString()}</Box>
      </Container>
    </ChakraProvider>
  );
}

export default Calendar2;