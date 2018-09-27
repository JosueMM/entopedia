import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Arthropod } from '../../../arthropod';
import * as jsPDF from 'jspdf';
import { ArthropodService } from '../../services/arthropod.service';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../../photo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  current_arthropod: Arthropod;
  operation = { is_new: true };
  proff: string
  who: boolean;
  buscar: string = "";
  avance: string = "";


  is_log = JSON.parse(sessionStorage.getItem('user'));

  photos: Photo[];
  photo: Photo;

  fileToUpload: File[];
  avances: JSON[] = [];


  insectos: Arthropod[];

  closeResult: string;

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.setFontSize(40);
    doc.text(50,25,"Club Entopedia.");
    doc.setFontSize(12);
    doc.text(53,30,"Club elaborado por y para estudiantes.\n");
    doc.line(50, 25, 180, 25)
    doc.addImage("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhISEhIVFhUVFRUVFRcVFRUVFRUVFRUXFhUVFRUYHSggGB0lHRcVITEhJSkrLy4uFx8zODMsNygtLisBCgoKDg0OGhAQFy0lIB0rLS0rLS0tLS0tLS0tLSstLSsrLSstKy0tLS0tLS0tLS0tLS0rKystKy0tLS0tLS03Lf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAYFBwj/xAA9EAABAwMCBAQEAwYGAgMBAAABAAIRAwQhEjEFBkFREyJhgQcycZEjQqEUUmKxwfAzcoLR4fFDolOSshX/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIDBAUG/8QAKBEBAQACAgEDAwMFAAAAAAAAAAECEQMhEgQxQRMiYQVR8BQjcZHh/9oADAMBAAIRAxEAPwD0ahynZMILbWjO06Gk/cq9T4bSb8tNg+jQP6K4ShLlz1HTaMW47D7JxThSShcUAOamhO5yHUmgQCZMCmJUBBOEAKcFQOnKAp0DhIoU5KASFG5SFRuQREIYRuCFRRtClaomqVqBwnASSaqh0xKJC5ABQFEUJRSCEhSBA5AEJJSEkHQJQkpFIhVCDkiUEpSrsMSnATAJyVQkxS1IHOUBNKUoQUlAcpShlMoCBTkoJToE4qMlE5BKBimSKUqKJqkaVEjaqiUJ2oWp0U7lC5yKo9Vi7KgmKeEIRhAyByclDKqFCZHKSKsSiBUJckHK7RK4KGpUAyUZqYXnPxD4Nf31enSoPay2DWlx1lsvLnapaBLoAECQM/ai5xr4pWVAlrC+s4Egim3AIMEanQD7LKXnxirGfDtWjsXVDI+oDf6rT8P+GljTYGuYajhBLnEgkxGwwB6LpDkew0hv7LTgEkYznfO6u4nbAN+L9zIm2px/nd+mF3uD/Fm3qENrsNEkxJOpn1LgMe4XR4h8MrCp8tN1MzP4biOh6ZHX9Fi+P/CurSD30awqAAkNcNLoxA1bd842CdVO3sFjxCnVaHU3te0jBa4EEGDgj6hWtS+WbZ9anFSn4rNM+Zmsac5kt2W45c+KNxS0tuR47P3hDagHr0d+mw+qXEle4SkCs1y5zrZ3mKVSHxJpvGl4A9Nj7E7rSByw0LUkCgajQMUDkL3JpUUSUqMp5QHKJhQAImoJ2Ji5IKtcVYRCr1VC05URdJUtNiKsNRgoAEYQC5ApXBRIDlJJMgeUpQykCqhnIgxIJyUDAJAoZRAoCC89+M3EnU7NtJhjxqga4gkeVoLiPeAPoV6ASsj8SeAm7tHBgmpTPiUwIkkDLZPcSPstSpXnvw64NTqXFF9vckuaJuaT6TmA0yCNIMlr8kbz36QtvzH8NbW4l9MeDUg5ZGgkknzM23JyIOV5Jybx39juadbduWv/AMjokj1GD7Qvoyzu2VWNewy1wBBHYrVSPnTmDly5sagFZsCToqM+V2mM4y07b/qtZyT8S30YpXpfUZOKvzPYOzgBLx67/VercZ4XSuaTqVVoc1wIyMjrI9wD7L5v4tYOt69ag/JpvLZ7jdrvcEGPVPcvT6bsLynWY2pTeHtcJBaQQfcKyF8z8ucz3Ni7VRf5T81N0ljvb8p9R+q9d5O+I1G7LaVQeFWMw0mWO7Brupjos3FZW4LFnOaucrWw8tQ6qhAIpMIL4MwSCcDBytD4oheKfFbg1dt4bktdUpPazIB8mnBY7TkA7g/xHspIV6Py5zna3mKb4f8A/G+Gv2nAnzddp2K7jb2mXmkHt8QAOLJGoNOA4t3jG681+HFDh9Zxr0KDmV6IAc17y4DU2C9knOzhODv3UXIXEG1eKX1Zz4kFjGuPmLQ+IAOcaJj+JLCV60NkmlZ3m/jptbOrXbGtohkiQXuOlsgdJKocrc0Pdw03t5p8usksEamtcQPKdiTj7KaVtHuhc8guKDhHFW3VtTuGhzW1G6gHRqA9YJHRXLJzS0kf3lTSipW8Iy1DUrwonVlRYARKBlREaigmcoXJOqKIuQTSkotSSLpF4ybxlAKakbSUZSCqn8RM2kj8NURl6IOKcU1M2mqI5KZ30U5Yo3BXQ8155+HX7Q91xbEMqEEvafle7GZ/Kd+/RZbkbnB9hUNvch4pSZaWnVSccyGxMGQSPeMr3EhYL4lcntuaTq9Jv47BOP8AyNEyw+uTHqrL8VLGv4bxajXbro1WVG92ODh7wqPEOWrKs57qlvSc58Fzi1uokCAdW8gbFfO9C5eyTTe9hIh2lzmk7iDEdz910+D80XVr4hpVJNQAOL5eYExBJxuVrSbDzRwgWl1VoNdqa2C0nfS4SA71C5AKnu7p9V5fUeXvJEucclQELTK5Q4vcsjRcVmwNIDajwAI0w0TAxjCuW/NV6zDbqrEEQXaxn0dK4wSCg9E5b+I7aXiGvQYCRq1UG6S8jZrx9OsqhZ8Jo3muvbW100B5/wAOtSJDsukB58sEj8w6Qsja2lSo4Mp03Pcc6WAkxIE+gzuvU+UeVL2izw6lz4LCS7RR0F4eYEl72EExjy7d+/k9Tzzhx3ub/P8Ax24sLnfZBxKnQfw51m64rU6oc2qXXrKlOXyDpdUcNIG2xPuuVT4Pxi6o0rUhrbdg0hwezQ9oOC4sJLwOmB6rd1uBVSGgXdRwGoEV206jXg7amBjNjGZn7rinhNe3Dn0w6mWuw6ze0MqCCTrtKryCZ3ILiYwuHD+oceXVs/n+dN58GU7jn888ddaWtLhdJxD20qYqubgeHpyA7+Igz6SuPyDx2tb3FChQfUdRqYq0nQ4NeZ1OpgfKBg49ZXP43VrXFy2u4Mp1nFjSQ8Ppa2w1kt0k0SceWp7xlbP4ccCuqde4rXNI09YGCGAOdJ1EBpx7QDqO69+5pw+Xo4cnhKgcKWVhtGJUjQUwKnpoBFMpvDVobISgg8NJT+ySCq1ycPUJQkoi0KiRqKsHJ5V2JvERCqq6cFNiwaijfUA3KEBeZfE6vVpit4b3NBLSY1ToLYcBG3XPoU2lumk478QrK2keJ4rx+Wl5vu7Ye5WQrfEDiNwD+y2Z0k+V+h9THqR5Z913+VuR7S3psq1GtfU0tcXO+VpgHyg4HXO61PCLy3rNJoPY5rXFh0EQ1zd2kDb/AJWx86cSFTxq3jCKutxeIiHEknboq5Xv3GeR7K4reNUp+cmXQSA+AANUb4ELD8z8OstbrSxtWOrAgVKudFAHuScuiYH/AEtS7ZvXdecAp1seOckeDRFSk+dAJql5gEbgtgQ3tv1GVkK9FzdOtjm6pLS5pbqAjIncbfdWxjHKZTcRkJQnCRRp6j8JbcCjVqFoBe8NBjJDQAfNIMTqOD16r0Gm7aO0n0+ogfq1eefDK6m3LJgsqRnAydUAwN52l30ytk0ECRsBtGwmMCDp+zF+Y9bhcufLf7vfxZ6wjpsd2MRnB6+xHp0Th0dTAE7x9PzKnb1p7kQO7vUiA5ytBx32Bz1EgY7D+wvDlhY9GOcycjjnAqVy065a4tILmwDG8GQQ9uJ0uJGy4fCeNVuH1GW16Zt3ANpV9w12+hxkwOwMxG5G2wAn6fmO/qBMmOnULnca4XTuaLqdRoIeMSJiBhwIMyCen+69vpPWZcV1l3i58vDMpue7vUKgiQcbj6dEQcs5yxfPIdbVi3xqENcWnD2fkqj0MEHsWlaWkxfoJZZuPF7HaFYohMximY1VDymTpAKhQkihJBz0iEg5FK1pA6UxapGpyp4iNIIy1M4KaDgrKc6WLXlmoAtcNLgdt8T9zhagLjc2lotnvcfk832x98/qplNxK5XO1E1eFVRTaSfDYdLTHlaWl23YA49IXN+D/EGOtXUxAfTfkBob5XfKTHzHByrHCOaGMZoqU3lsE6mN1CCerB54M/uqpecp0iTecOufBcZdLSHUnD8wjoD2/Raxu4n5dLnvmF1MC1t3RXqCXP6UKM+ao494kBcng9a0taA0Vqek6jqD2l1VwkuMg6i7H9FmOG2nELwVK5qsb44a0ucPMWNkAMxAbv16krm8e5QqW1MVXPa+SA4Q4HWXQAJy7pnGZXfGeMefk1ndXJ17nj9K5dUrVjqo0dTadAh34z3GWOcDAOYMZgZKpXV++nTdUuWh1xWbpo03NDm0qYcCBoJlv2zAzKzItarWioGODZPnAMBzN5I2hazkXhlStVFxXD3MZlhqai0k5cWkgiAM+/oYd2rZjhNpeCchB7A+u57S4A6WbtEzBkGZA/7wrfFORKVOhWdT8WpUDJYCTMjJiGgH6HP0K25aCRMbEnYY+/oOnX6oK0AOLi0BoM4bt0Bk9o+66Xjmnk+vna8s5J5jFo8teCadQtmA2Wu21E76Y3APsV6tbXdOswPY5jmflIjSPRpJ/kWnbGV4z/8Azn3FW4Nu3W1rnvEdW6j8uInMgfYlU7O8fTIdSeWkEEQSIc3Ywvl+p9Fjy3yl1X1MOXU097AmCZ9wTuP4muG3YomVNJhoxPQN+0tZjf0WI5f55pvIZWAB0CagBDAY8wfI8uBuCR9NltaVUODXMIOA4EQe8GWgk42IO/1Xyc/T3jus47fU+cXQ0iB129TJMjM4+4+ijeN/XBOMbYEj1H33QW1YmRJOT3MSY3kneRv1CKrG+wPsAPp9/vlfPyx1Xuwy3HB4+TRNK7Y2TRdD8eZ1B5AqAn08ro/g9SttauBAI2K4LWhwcTEQ4OLto6/yKfkCrNjQ3IAc1hJmWNcWsdMD8oavt/pnJcuO434eT1GOst/u04CNRgopX03nElKaU5KB0kpSV0ORrRB6ryn1LO0WWvTmoq2pIlXYn8dc6/4/bUf8WtTZ6OcAdp2Vir8p+hXz2zhNatXuGA6qlPxC4vJLnaCRA6uJjC1JtLXr198RrCnBFU1D2ptJ+5MAKrx3j9O6sqb6eoCrWY0B2D+G/W+Y9GFeSDh7jQdcThlVtN7f3dTT5j7wPuthwhzv2SyaTjxK74jT+WBGBqw5xnY53TKaibdKo4t8w2wN9j19B/zndVL+2FRlUMe+kHtd4mgtDHw2YczqcRO8DqAr1MgTIJkQfpkR9P7gbqvcDSCZEaSDkSJ3BycR2yF5MbZemVrhPEPAZTpVWDQ0ACowmIAgF9Pdsk75Hr0VH4jS9luxhJLq+P3ZLcT3O36q2wgjZrmn8ojII/NG49vY9GboY+myoA6iS3wdRM0KmkhoBOwMGMiHY/y+zj5vL7a8+XHMb5R3+FWTKVJtJoGkMAAExtknf67Hf72qYa0AAAbYGkZ3xICU98DH0/UHP9/Ras9Y9D79DH6f0XtkeK20Zce5jH73SJ2eew/XtnDc88yPBFrRJ1EQ8jVqE4DQD3B/uVt3jEkSYkzJ3I7tMbSvMuIUjY8RFR4lj3l8ugkhx824GkgnptjK58m3bgk321nIvBTb0DrEPqEF0AEtAEBhwcgz13Vni3KlrcSXMIqEDzMMObpmO8jJ3GYXXaQfWffGM7ntO2MqVx2BwPXYD6H6HYLUxmnO8mXlt5TxPk26ofiU/wAQNyDTJFVud9AzP0UXA+aq9s5tM5ph0vY6QcnJE/K7f0ncTles1GT/AEB3Ht06fl6FZH4hVqLaBaWsNVwGgua0vA6kGC5n6Z7Lhy8OOU1Y9fFz5W6aHl/majd5okyIljvLUaOpO8zAyCRhdyo8udj/AGGwMf3+q8Y5a5auK4Nek/wfDktf5g7ygk6CMdO63XKXLd3Wt6dSrxCsKdRjXBlOAQ1wmPEIJBzuIXxef9L3d45f7fS4fUydadLil66s79itn6qj/LWeMihTPzOJ21kYA9Z2WusbZtKnTpMENY0NaOwaICg4LwijbM0UmaRJcTJLnOO7nOOXH1KvEZXs4ODHhw8cWc87nd1ZpoimYncu7BMRlA1GgUJIvdJBnwU0oJSlYEgcnDlGCnVDl6ylHlLRfm8Y/DtWthBzqbGHT3gwtW0KK/uhRpVKhBdoa52lolx0iYA6lWbTpzbPlm2pMq020hpqu1PBlwJmR80xHTss9zJwSnai2Nu1rA17mls7iqJPqTLW/ZZrj3PN/UZqYzwKROkH85IO0u/UAYXQ5btLqtZ1aldz3EfiUA8y+WhwdgiYdtk5BO2CdWXTKZoG56d52j1x2MzHcyCk5mmdgT7TO/6f8AbobW4D2tcCIOQcCTOMnbP1InAlG/bHrvuYOZ957+pJwvKyJrdUYAd1kY+noD/xno7oc0McJl8ZIIkR2PSMEfyUdFxBBO+4ycH3jT0kn7jZHcEioIGJ1bx5uv8AZH+yqaXuAXxzSqEmpSiScl7DIY+ZBdsQd8tPouwTgHt3BOc52PQnr39Vmb4OgVWf4jMgAjztnz0zIO8HcdJxGO3ZXDKrWva5pBb5SCOuR2k/bZfR4OXyx/MeLm4/G7nytsgwcf8ArmPXC4nOHDG17d4wXMBczOA5oJONQmRI677FdsTgj+ZOP/tujHrO/U9TPdy7ZTccccvG7jKch8bbVpNoOeTUY3Ad+5ON4BifX1Wra/tjbp7xiB/NecXlm7h9824/8FSoQdIdhr/nbHpkjOYC9GoXAe1r2OBaRq1DII6QR9e6zhfh05sZvynyh4peto031HYDWudBgT2bGBn36LzKzta/ErkvIPhhwLjI002npiOxyr/xG4m11ZlAavw8vIABOsQA09cesLXcvWlKlbt8GC0gP1HBcSAQXY/p0GcLF+66dMf7eG/mulTpMoUHNbhjKbmgTEw2fSenddbkuk5ljaNeIcKNOfTyiB9oWW5m4k0UTb65q3MUmho/K8hrjjGATPvlb+3YGtDRsAAPZc+a/Dv6aXVtTtTgJNRSuL1JKaMqNr0QcgMJyYUYchqvQSaklX8RMoOKESiLk+tYEwThQCokKiostTloO6reMo31SVdjz74g8u3VzdMNFrTSDIb5g0NdPmnrnHfYpWPCn2D6V3fXUj5CyHvAcZDcg7D/ACr0ejS6rMfEirQbZuZWJ83+GGiT4gy39R1wty76ZscW+006uukZpXINRhaAWh2NbZ6zJd6y7aEJkmZMdR6YG8enSew3xleX+PhlIW9wHeGTNKoN6LvlLmTu0SZH1EGYWmovI8pwQBqMiCC0EPBnLTmCZwHAZXLkw+WTvbBEvd02gbGMRt7dds7TV2QGOEktjJM4OxjoJJ/uUxZ/32joO2+wjcDJJSonBBA7Rg4mJMAdukAQQJAJPJEzyfDed/Ln+GcRH2z9PSI7at+zONRomlULS9onyyYNQQT/AA6hG2d8GF7i1rm7eRxaYGRBiPWf/wBTmQrbQNMHPUk50wCPf830h3YBbwzuF3GcsZlNVoTkST2ONzOSct3zhNTBBzj2+/QbSQs5b3htSWvM0j8p6UxImcjySW5I8uem2jbB7Gd4iD9Iae6+lhyTObj5+fHcap8a4c24pOpP/MMHctd0I3Mjf+ysxyPXdbVatlXkO1a6c/K6BksxsYBx1BWzIPfMd5ydzn/ZU+JcOp1X0nGQ6mSWEESARBBBnB7QNt1bO9xcc+rjXL514QK9FzmU9VVsFpAbqIBlw1bx82J6LkchcbL2/szvmbmnO5bmW56g+owtwHzv3APrmInr9/Zea840adG4c+11BwB/aCySxjn4+YDykgkEfoFjPrt24vunhUnGb0tvTd0hqp272s3JDnAQ9zewyftPdewcA4xTuaTalM7gGJyPqvKuHU2ijTaGjS5ojs8EnVB7/NIPVy59O9q8PuA2kXGmTI6kTh2n19oIPuuNm3rx6mnvbCjcuFy5x5tcaXeWoBkfveo/2XeJXN0RakepRPMFIOUVMHIXlDKElA0pJkyDiFIp4TwsaUIKcogE4CukCGqalTTtapQYV0JBAWH5j5UdeXbatSofBawNDBMkyZz0Gy2D6kpYWk0z/HuWqVa18ExTawAtc0AaA3+kSsGeO2Qp07U63CmC1tyGgFrpnU3qWz+ndaP4sX9RttTY0kNfU0vjEt0k6SexI9157xCra+BRp0WTVMGq8gg6ttIJ6E9sLWM6Zrb+aiWsrDDg3w3scdNTeNJ6HJx/FI2lJ7gRhpJ2wAAQWkkCTgQCJ3jGJUPF+OttbSjaVB4tQ0hqBMgYxqP1wPojsLGq+hSrUQajHDLcCo3MmSSA+CAOmB1XHLj+YmiqV5GksiQcktkODgMxmdjA6kBTCuWuAd8xjSdg+QB5R0OBj0bGCVBTqtMghzXNMFp8rtYnBkYJmdo805gKy9gO4HvtJMktk9pP+luy52aRNWEOYDBDgWkeuDDR/pcB9+qr2r6lsT4cvpHelq8zNONVIHAGx04G0R1Dw3CNDgS3zAPMloILcP6A53GzT0U9O+6upPH+WHDHaDMZj/SrjlcbuM5YyzVdq14hSqj8NzTESARLBEw5uNJ9CET6wa0ue4MaOrjAH/cHosuWU9eppNNwEMqta5rwD8zDI8wjp/UKtZNcKraly5t3gECq402sIHzBhaWnsJ+vVezH1Ms7cP6fv3d+hVr3xNO2DqVDZ1y4FpcDuKAOTO2rZa7hvAqFCj4DKY0H5pEl5O7nk/MSs/b87sAj9mqDp5DSI9vMD+nRWmc60jvRrgd9DT1jGlxnMLnln5PVhhjhNRmOXqVOje3PC3ZpOOul3puw4Bp6GCNu31V3jHL77dwe4CowTFSPM3sHdtmieqnPCLK9vW3bLhzag0k048N+um4Q6HgGI8pgQVvtIIIOe4V8mtPMADhzTBGQZOSNj26tP1ctXwHmiSGXBAOA1370/vdtwqXMHLRp6qlASw5cwbt7lvtP2WeaAd5xj6GTPtII9mrXuz3HrFVsnCJtLCwvA+YatEhjgarCQAZ8wkgb9Qt7TrBwkLF6bl2Hw0vBRGp0RscoIP2cpK3KSDKynlREogVlRynlRyiBQTg4QOch1YQEqocFSAYQMCkOyK53F+FU7mmaVUS0+xBGxB7rlcK5Jtbdxexmp0GC86o+gOPdaQuQl6bR4nx/gt0PFurhhZqqgQYM6pAIIOAIAzvIXaPPP7NQo29oAS2mA59QbOIGGj80ZzsvTL6yZWYWVWB7TuHDBzKy3NPKzRZvp2luzXLTAgEgGSQTufqVvy37poXL13S4hbmpc0WamktLoiAIMh+7fuuYbuxc/wAOleuDyQAajA6kTtEhrR+uU9/yw+hwqrTZLqmKlSJgxGoD0DR7wsNFF1tTYxuq4dVIODOgjygdMmP1U1Kleh3dhVtwPEqWxDyA1z3upa3H8hEO6NbnV3wrFGxvIafAaQN4qtMkk5b09cxklcTn2l4VhZ0XumoCz/1YdRjsJA91sOVuI0qdlbTWafw2gkuG4EEZ7EEeyz4T30ajh3lGtRAqVaEA4BdVpBrdgJBfiRMxJ+qt8P4Nc1hPiW7ATh7JryACNoaM+h/njEc68RNa/ey4e4Uqbg0BuYbpnUGmRJneF0vhXVqm5qspuPgaXEh31im4Yw7/AJV+njJs+WmvOHUaDmsr3zGOcfKNFNoPSIdJ6jr0Cv1eWbemPEuLl+kx8z2UmydocwA+0ryjjVSo26uDdt11GuI0u1AOE+WNPTSZHotFxzmmhd2LGVab6b2loYWjUzWxoBgztB2PdXwhuNJzEeF21NjnU2VdTw0EfivBHzHUXSMT1T2F1c0321axL69nVcG1GVHOc+nLtJc0vOpoHaT8vuvJ7OgxzgKlQUwRl2gvAz2BH3Wx5m4y62Ntb2lc02MpBzjTwHOcfmIEzsT7rWjb22nlZvmLloPmrQAa/Jc3YPxOOzpj6rP/AA55zq3L329chzmtLmVANOtoIB1DvkH3XoNJ8rPtWveMny7wkiH1GaT0bG2NzH2j0Wvs2QEJpgKek5T3JCe1C10KYnCqVnKKm8YJKjJSTY40pwgTgrIMFPKjTyqD1JgUMpAoJWFOXKMFMXKhy5E0qJG0qKsESnDU9NO4IgTEEd1y7Tl21pv8RlFjXnqB/cLoTlTMVHL4/wAu0LxjW1gfLJaQSC0kRON/oVlaPwqo65dWe5s7Q0EiMy4f0hehNUzArLU0znG+SbW60F7SHNGkOaS0lvYnr3V7gPL9CzbpotiY1HdziOpK7SjKm105PGOXLa5INak15AgHYgdpCVPl+1ZT8JtGnomdOkET1MHquoXKIvlNmnAveSbGrE0GtxH4f4ZgGY8sKq74eWrrk1jOgwfCwKcgRmBMei1tJTQrummHp8qOtuIftVHQKL2ulgkFhIAhoGIJE/dbSxJUVwJhT22FNi69qFOXISiDa9Q1SlMIHFFNCSZJRXAJSBQEpArMRJKUoE8qgpSBQynlAcpkMogqpImIU7UFykieo6IUxaqiABSsCaEbQgkYFMFEwKVA4Ub3IpUFQoInvSphA5S0goqxSCnIUTFKFUV3hHTKdzULUFoFEFC1TsCAHNURCtEKBwQBCSOElFZkpgkksodOEkkDpJJKqdEEkkCTtSSVFuipwkkrEAUQSSVErUaSSAXKs7qkkoIwrFNJJQWWo2pJKgCmSSRUtNTMSSRBBRPSSSgEkkllX//Z", 'JPEG', 80, 40, 50, 50);
    
    doc.line(25, 95, 200, 95)
    doc.line(25, 95, 25, 200) 
    doc.line(200, 95, 200, 200) 
    doc.line(25, 200, 200, 200)
    doc.setFontSize(15);
    doc.text(
      "* Nombre Cientifico: " + this.current_arthropod.scientific_name +
      "\n* Clase: " + this.current_arthropod.cla_art +
      "\n* Nombre Comun: " + this.current_arthropod.common_name +
      "\n* Orden: " + this.current_arthropod.order_subphylum +
      "\n* Familia: " + this.current_arthropod.family +
      "\n* Habitad: " + this.current_arthropod.habitat +
      "\n* Habitos: " + this.current_arthropod.habits +
      "\n* Genero: " + this.current_arthropod.genus +
      "\n* Especie: " + this.current_arthropod.specie +
      "\n* Impacto en la Humanidad: " + this.current_arthropod.impact_on_humanity +
      "\n* Descripcion: " + this.current_arthropod.description +
      "\n* Tamaño del cuerpo: " + this.current_arthropod.body_size +
      "\n* Subfilo: " + this.current_arthropod.subphylum ,50,100);
      doc.setFontSize(10);
      doc.text(25,208,"Toda esta informacion ha sido digitada por el club\nsi logras ver algun error \npuedes Contactarnos en nuestro \nFacebook https://www.facebook.com/Club-Entomolog%C3%ADa-UTN-sancarlos-1186973771382964/")

    doc.save(this.current_arthropod.scientific_name + '.pfd');

  }


  constructor(private modalService: NgbModal, private arthropodService: ArthropodService,private router:Router, private photoService: PhotoService) { }

  vermas(inse: Arthropod) {
    this.current_arthropod = inse;

  }

  returnValidate() {
    if (this.proff === "Chelicerata") {
      this.who = true;
    } else {
      this.who = false;
    }
  }

  open(content, id) {

    this.modalService.open(content).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
      this.current_arthropod = new Arthropod();
      this.ngOnInit();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.current_arthropod = new Arthropod();
      this.ngOnInit();
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    let token = sessionStorage.getItem("token");
if(token == undefined ){
  this.router.navigateByUrl('/login');
}
    this.fileToUpload = [];
    this.current_arthropod = new Arthropod();


    if (this.buscar === "" || this.buscar == undefined) {
      this.getArthropod();
      return;

    } else {
      this.getSearch();
      return;
    }
   
  }

  editArthropod(art: Arthropod) {
    this.current_arthropod = art;
    this.operation.is_new = false;
  }

  isAdmi() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let is_admi = user.is_admi;

    if (is_admi === 1) {
      return true;
    } else {
      return false;
    }
  }

  getArthropod() {
    this.arthropodService.getArthropod()
      .subscribe(art => {
        this.insectos = art.json(); 
      });
  }

  getSearch() {

    this.arthropodService.getSearch(this.buscar)
      .subscribe(art => {
        this.insectos = art.json();
        this.buscar = "";
        return;
      });

  }




  handleFileInput(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.fileToUpload.push(element);

    }
    console.log(this.fileToUpload);
  }

  addArthropod() {
    
    if (this.operation.is_new) {
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.current_arthropod.user_id = user.id;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var fecha = dd + "/" + mm + "/" + yyyy;
      this.current_arthropod.insert_date = fecha;

      this.arthropodService.addArthropod(this.current_arthropod)
        .subscribe(res => {
      
          this.operation.is_new = false;
          this.current_arthropod = new Arthropod();
          this.photo = new Photo();

          let lastId = res.json().insertId;
          this.photo = new Photo();
          for (let index = 0; index < this.fileToUpload.length; index++) {

            let photo_name = this.fileToUpload[index].name;

            this.photo.arthropod_id = lastId;
            this.photo.name_photo = photo_name;
            console.log(this.photo);

            this.photoService.savePhoto(this.photo)
              .subscribe(res => {
                console.log(this.fileToUpload[index]);
                this.ngOnInit();
              });

          }

          this.ngOnInit();
        });
      alert("Artopodo insertado");
      return;

    }
    this.arthropodService.updateArthropod(this.current_arthropod)
      .subscribe(res => {
        this.current_arthropod = new Arthropod();
        this.operation.is_new = true;
        this.ngOnInit();
      });

  }


  deleteArthropod(id: number) {
    this.arthropodService.deleteArthropod(id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }



}
