import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EventItem = ({ eventname, description, image, id, startdate, enddate }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="Event Image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {eventname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(startdate).toLocaleDateString()} - {new Date(enddate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">Book</Button>
      </CardActions>
    </Card>
  );
};

export default EventItem;
