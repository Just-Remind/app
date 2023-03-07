/* eslint-disable */
import { Highlight } from "./reminder/_utils";
import CryptoJS from 'crypto-js'

type BuildRemindersHTMLParams = {
  selectedHighlights: Highlight[];
  userEmail: string;
  withDeactivate?: boolean;
}

type GetEmailParams = {
  selectedHighlights: Highlight[];
  userEmail: string;
  greeting: string;
  bonusHighlighs?: Highlight[] | null;
  starterHighlihts?: boolean;
  firstStarterHighlights?: boolean;
}

const buildRemindersHTML = (params: BuildRemindersHTMLParams): string => {
  const { selectedHighlights, userEmail, withDeactivate = true } = params;

  const htmlBlocks: string[] = [];

  selectedHighlights.forEach((highlight) => {
    const query = `user=${userEmail}&id=${highlight.id}`;
    const key = process.env.ENCRYPTION_KEY;
    let encrypted;
    if (key) encrypted = CryptoJS.AES.encrypt(query, key);

    htmlBlocks.push(` <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
      <td class="pad" style="padding-left:10px;padding-right:10px;padding-top:10px;">
        <div
          style="color:#9a6f3d;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
          <p style="margin: 0; margin-bottom: 10px;"><strong>${highlight.book.title}<em> </em></strong></p>
          <p style="margin: 0;">- ${highlight.book.author}</p>
        </div>
      </td>
    </tr>
  </table>
  <table border="0" cellpadding="10" cellspacing="0" class="divider_block block-2"
    role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
      <td class="pad">
        <div align="center" class="alignment">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
            <tr>
              <td class="divider_inner"
                style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
                <span> </span></td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
      <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;">
        <div
          style="color:#9a6f3d;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
          <p style="margin: 0;">${highlight.content}</p>
        </div>
      </td>
    </tr>
    <tr>
    ${withDeactivate ? `<td style="padding-bottom:30px;padding-left:10px;padding-right:10px;">
      <div style="color:#393d47;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:right;">
        <a href="${process.env.ENV_URL}/user_update?${encrypted ? encodeURIComponent(encrypted.toString()) : query}" target="_blank" style="margin: 0; color: rgb(37, 99, 235); cursor: pointer; text-decoration: none;">Deactivate</a>
      </div>
    </td>` : ''}
  </tr>
  </table>`)
  });

  return htmlBlocks.join("");
};

const getIntroText = ({ starterHighlihts = false, firstStarterHighlights = false } = {}): string => {
  const fontZise = starterHighlihts ? '17px' : '19px';
  let text;
  if (starterHighlihts && firstStarterHighlights) {
    text = 'We noticed that you have not yet uploaded your own books on Just Remind, so we hand-picked some highlights for you to enjoy for the next 30 days! But make sure to <a href="https://justremind.app/" target="_blank" style="text-decoration: underline; color: #8a3c90;" rel="noopener">upload your own</a>! 👌'
  } else if (starterHighlihts && !firstStarterHighlights) {
    text = 'Here are your hand-picked highlights of the day. You can upload your own books in the <a href="https://justremind.app/" target="_blank" style="text-decoration: underline; color: #8a3c90;" rel="noopener">app</a>!'
  } else {
    text = 'Here are your highlights of the day:';
  }

  return (
    `<div
      style="color:#9a6f3d;font-size:${fontZise};font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;mso-line-height-alt:22.8px;">
      <p style="margin: 0;">${text}</p>
    </div>`
  )
}

export const getEmail = (params: GetEmailParams): string => {
  const { selectedHighlights, userEmail, greeting, starterHighlihts, firstStarterHighlights } = params;
  let remindersHTML = '';
  if (selectedHighlights.length > 0) remindersHTML = buildRemindersHTML({ selectedHighlights, userEmail, withDeactivate: !starterHighlihts });

  let bonusHighlightsHTML = '';
  // if (bonusHighlighs) bonusHighlightsHTML = buildRemindersHTML(bonusHighlighs, userEmail, false);

  const introText = getIntroText({ starterHighlihts, firstStarterHighlights });

  const email = `<!DOCTYPE html>

  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      @media (max-width:720px) {
        .row-content {
          width: 100% !important;
        }

        .mobile_hide {
          display: none;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }

        .row-3 .column-1 .block-12.paragraph_block td.pad,
        .row-3 .column-1 .block-15.paragraph_block td.pad,
        .row-3 .column-1 .block-3.paragraph_block td.pad,
        .row-3 .column-1 .block-6.paragraph_block td.pad,
        .row-3 .column-1 .block-9.paragraph_block td.pad {
          padding: 0 15px 30px !important;
        }

        .row-1 .column-1 .block-3.heading_block td.pad,
        .row-2 .column-1 .block-1.paragraph_block td.pad {
          padding: 0 15px !important;
        }

        .row-1 .column-1 .block-3.heading_block h1 {
          font-size: 30px !important;
        }

        .row-3 .column-1 .block-1.paragraph_block td.pad,
        .row-3 .column-1 .block-10.paragraph_block td.pad,
        .row-3 .column-1 .block-13.paragraph_block td.pad,
        .row-3 .column-1 .block-4.paragraph_block td.pad,
        .row-3 .column-1 .block-7.paragraph_block td.pad {
          padding: 10px 15px 0 !important;
        }

        .row-2 .column-1 .block-1.paragraph_block td.pad>div {
          font-size: 16px !important;
        }
      }
    </style>
  </head>

  <body style="background-color: #fdf0e4; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdf0e4;" width="100%">
      <tbody>
        <tr>
          <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width: 700px;"
                      width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                            width="100%">
                            <table border="0" cellpadding="0" cellspacing="0" class="html_block block-1"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td class="pad">
                                  <div align="center"
                                    style="font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;">
                                    <div
                                      style="height: fit-content; ;background-color: #FBB591; border-radius: 0% 0 0 60px">
                                      <h1 style="color: #FFFFFF; padding: 20px 0; margin: 0;">Just Remind 📚</h1>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table border="0" cellpadding="10" cellspacing="0" class="divider_block block-2"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td class="pad">
                                  <div align="center" class="alignment">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tr>
                                        <td class="divider_inner"
                                          style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                          <span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td class="pad" style="text-align:center;width:100%; padding-left: 10px">
                                  <h1
                                    style="margin: 0; color: #9a6f3d; direction: ltr; font-family: 'Merriwheater', 'Georgia', serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;">
                                    ${greeting} 👋</h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            ${remindersHTML && `<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                            width="100%">
                            <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1"
                              role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                              <tr>
                                <td class="pad" style="padding-left: 10px">
                                  ${introText}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                            width="100%">
                            ${remindersHTML}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>`}

            ${starterHighlihts ? `
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin-top: 10px;" width="100%";>
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="100%">
                              <div style="
                                padding-left: 10px;
                                font-size: 12px;
                                color: #9a6f3d;
                                font-family:Arial, Helvetica Neue, Helvetica, sans-serif
                              ">
                                If you don't want to receive these emails, login to the <a href="https://justremind.app/" target="_blank" style="text-decoration: underline; color: #8a3c90;" rel="noopener">app</a> and deactivate your account.
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            ` : ''}

            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-top: 20px;" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width: 700px;"
                      width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                            width="100%">
                            <table border="0" cellpadding="0" cellspacing="0" class="html_block block-1"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td class="pad">
                                  <div align="center"
                                    style="font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;">
                                    <div
                                      style="height: fit-content; ;background-color: #FA9B55; border-radius: 40px 40px 0 0">
                                      <h3 style="color: #FFFFFF; padding: 20px 0; margin: 0;">Have an inspiring day 🙏
                                      </h3>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!-- End -->
  </body>

  </html>`;

  return email;
};

export const getFinishSetupEmail = (): string => `
  <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css">
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      @media (max-width:720px) {
        .row-content {
          width: 100% !important;
        }

        .mobile_hide {
          display: none;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }
    </style>
  </head>

  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 10px; padding-right: 10px; vertical-align: top; padding-top: 10px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: 'Merriwheater', 'Georgia', serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Just Remind 📚</span></h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                    <p style="margin: 0; margin-bottom: 16px;">Hi there!</p>
                                    <p style="margin: 0; margin-bottom: 16px;">You can now log in on <a href="https://justremind.app/" target="_blank" style="text-decoration: underline; color: #8a3c90;" rel="noopener">Just Remind</a> to sync your Kindle books and start enjoying your daily email.</p>
                                    <p style="margin: 0; margin-bottom: 16px;">Note that you will need to be on a computer with Google Chrome.</p>
                                    <p style="margin: 0; margin-bottom: 16px;">In case you have any question, just reply to this email and I'll be happy to help you!</p>
                                    <p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
                                    <p style="margin: 0; margin-bottom: 16px;">— Loïc, creator of Just Remind 📚</p>
                                    <p style="margin: 0;">&nbsp;</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!-- End -->
  </body>

  </html>
`;
