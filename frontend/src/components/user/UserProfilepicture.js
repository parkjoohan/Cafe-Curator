import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const UserProfilepicture = () => (
  <Grid container columns={3}>
    <Grid.Column>
      <Image src={process.env.PUBLIC_URL + "/image/map.png"} />
    </Grid.Column>
    <Grid.Column>
      <Image src={process.env.PUBLIC_URL + "/image/map.png"} />
    </Grid.Column>
    <Grid.Column>
      <Image src={process.env.PUBLIC_URL + "/image/map.png"} />
    </Grid.Column>
  </Grid>
)

export default UserProfilepicture;