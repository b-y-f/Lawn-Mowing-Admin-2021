/* eslint-disable no-sequences */
// material
import { Grid, Container } from '@mui/material';
import { useEffect } from 'react';
// components
import { useLocalStorage } from '../utils/localStorage';
import Page from '../components/Page';
import {
  AppTotalQuotes,
  AppBugReports,
  AppAvgRating,
  AppTotalBookings,
  AppWebsiteVisits,
  AppQuoteRegions
  // AppCurrentSubject,
  // AppWorkerRates
} from '../components/_dashboard/app';

// service
import quoteService from '../services/quotes';
import bookingService from '../services/bookings';
import { convertOccurrenceObjToArray } from '../utils/convertObjectToArray';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // states
  const [quotes, setQuotes] = useLocalStorage('quotes', []);
  const [bookings, setBookings] = useLocalStorage('bookings', []);

  // statics
  const totalQuotes = quotes.length;
  const totalBookings = bookings.length;
  const averageRating = bookings.reduce((acc, cur) => acc + cur.rating, 0) / totalBookings;
  const unRepliedQuotesNumber = quotes.filter((q) => !q.hasReplied).length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;

  // for regional pie chart
  const regionOccurrences = quotes.reduce(
    (prev, curr) => (
      (prev[curr?.address_components?.at(-3)?.long_name] =
        (prev[curr?.address_components?.at(-3)?.long_name] || 0) + 1),
      prev
    ),
    {}
  );

  const top4Regions = convertOccurrenceObjToArray(regionOccurrences)
    .sort((a, b) => b.number - a.number)
    .slice(0, 4);

  // logs
  // console.log('top4Regions', top4Regions);
  // console.log(quotes[5].address_components.at(-3).long_name);
  // console.log('unRepliedQuotesNumber', unRepliedQuotesNumber);
  // fetch bookings and quotes then render then out
  useEffect(() => {
    async function fetchData() {
      const resQuote = await quoteService.getAll();
      const resBooking = await bookingService.getAll();
      setQuotes(resQuote);
      setBookings(resBooking);

      return () => {
        setQuotes({}); // unmount
        setBookings({});
      };
    }

    return fetchData();
  }, [setQuotes, setBookings]);
  return (
    <Page title="Lawn Mowing Dashboard">
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box> */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalBookings totalBookings={totalBookings} pendingBookings={pendingBookings} />
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
            <AppQuoteRegions top4Regions={top4Regions} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWorkerRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

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
