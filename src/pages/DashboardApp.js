// material
import { Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
// components
import { writeStorage } from '@rehooks/local-storage';
import Page from '../components/Page';
import {
  AppTotalQuotes,
  AppBugReports,
  AppAvgRating,
  AppTotalBookings,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppCurrentSubject,
  AppWorkerRates
} from '../components/_dashboard/app';

// service
import quoteService from '../services/quotes';
import bookingService from '../services/bookings';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // states
  const [quotes, setQuotes] = useState([]);
  const [bookings, setBookings] = useState([]);

  // statics
  const totalQuotes = quotes.length;
  const totalBookings = bookings.length;
  const averageRating = bookings.reduce((acc, cur) => acc + cur.rating, 0) / totalBookings;
  const unRepliedQuotesNumber = quotes.filter((q) => !q.hasReplied).length;

  // logs
  // console.log(averageRating);
  // console.log('unRepliedQuotesNumber', unRepliedQuotesNumber);
  // TODO fetch bookings and quotes then render then out
  useEffect(() => {
    async function fetchData() {
      const resQuote = await quoteService.getAll();
      setQuotes(resQuote);
      const resBooking = await bookingService.getAll();
      setBookings(resBooking);

      writeStorage('bookings', resBooking);
      writeStorage('quotes', resQuote);
    }

    fetchData();
  }, []);
  return (
    <Page title="Lawn Mowing Dashboard">
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box> */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalBookings totalBookings={totalBookings} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalQuotes
              totalQuotes={totalQuotes}
              unRepliedQuotesNumber={unRepliedQuotesNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppAvgRating averageRating={averageRating} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWorkerRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
