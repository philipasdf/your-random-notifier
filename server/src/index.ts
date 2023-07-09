import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import webpush from 'web-push';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

const publicVapidKey = 'BPwAheySEk5TJKlLze_zG8fsKqO6rpDfHUueaRQLXnCI2JZGcxBv9BjMlhmia_e2hbuSiIH-FVzRDZqr7Cgk40E';
const privateVapidKey = 'kvkfaOrFsF8sC_nIbO47koEusO2K58GR7LQoCcl3HGk'; // do not commit this to your repo!!

webpush.setVapidDetails('mailto:ng.philip.91@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req: Request, res: Response) => {
  console.log('someone subscribed!', req.body);
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Push notifications with Angular',
  });

  webpush.sendNotification(subscription, payload).catch((error: any) => console.error(error));
});

app.post('/send-notification', (req: Request, res: Response) => {
  console.log('sending notification to all subscribers...', req.body);
  const notification = req.body;

  res.status(200).json({});

  const payload = JSON.stringify(notification);

  // Replace 'subscriptionObject' with the actual subscription object of the subscriber
  const subscriptionObject = {
    endpoint: '...',
    expirationTime: null,
    keys: {
      p256dh: '...',
      auth: '...',
    },
  };

  webpush.sendNotification(subscriptionObject, payload).catch((error: any) => console.error(error));
});

app.get('/', (req: Request, res: Response) => {
  res.send('Server works! :)');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
