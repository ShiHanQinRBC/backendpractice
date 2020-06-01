import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models';
import routes from './routes';
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
 
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use(cors());

app.get('/session', (req, res) => {
  //return res.send(users[req.me.id]);
  return res.send(req.context.models.users[req.context.me.id]);
});

/*app.get('/users', (req, res) => {
    return res.send(Object.values(users));
});
   
app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
});
   
app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});*/

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});
 
app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});
 
app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});
 
app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});


   
app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
   
    //messages[id] = message;
    req.context.models.messages[id] = message;

    return res.send(message);
  });

  app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.models.messages;
 
  req.context.models.messages = otherMessages;
   
    return res.send(message);
  });


/*app.post('/users', (req, res) => {
    return res.send('Received a POST HTTP method');
});
   
app.put('/users/:userId', (req, res) => {
    return res.send(
      `PUT HTTP method on user/${req.params.userId} resource`,
    );
  });
   
app.delete('/users/:userId', (req, res) => {
    return res.send(
        `DELETE HTTP method on user/${req.params.userId} resource`,
    );
});*/

/*app.get('/example', (req, res) => {
    res.send('hey World!');
  });*/
 
  app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

/*app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    }
);*/