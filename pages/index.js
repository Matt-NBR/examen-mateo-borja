import api from "../api/api";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  sectionDiv: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    color: "#595959",
    padding: "50px"
  },
  title: {
    fontWeight: "bold"
  },
  mainAdvice: {
    textAlign: "center",
    color: "#595959",
    padding: "0px 50px"
  },
  mainButtons: {
    display: "flex",
    justifyContent: "space-around",
    width: "600px",
    margin: "0 auto",
    padding: "40px 0px"
  },
  blueButton: {
    backgroundColor: "#1890ff",
    color: "white",
    fontSize: "1em"
  }
}));

export default function RandomAdvice({ advices }) {
  const classes = useStyles();
  const router = useRouter();
  
  const refreshAdvice = () => {
    router.replace(router.asPath);
  }

  return (
    <>
    <div className={classes.sectionDiv}>
      <Typography variant="h1" className={classes.title}>Consejo del dia</Typography>
    </div>
    <div className={classes.mainAdvice}>
      <Typography variant="h3">{advices.slip.advice}</Typography>
    </div>
    <div className={classes.mainButtons}>
      <Button variant="contained" className={classes.blueButton}>Marcar como Favorito</Button>
      <Button variant="contained" className={classes.blueButton} onClick={() => refreshAdvice()}>
        <SearchIcon/>
        Siguiente Consejo
      </Button>
    </div>
    <div className={classes.sectionDiv}>
      <Typography variant="h1" className={classes.title}>Consejos favoritos</Typography>
    </div>
    </>
  ) 
  
}

export async function getStaticProps(context) {
  let advices = [];
  try {
    const response = await api.get("advice")
    advices = response.data;
  } catch (e) {}
  return {
    props: {
      advices
    }
  }
}


